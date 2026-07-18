<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\MinistryRequest;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminTest extends TestCase
{
    use RefreshDatabase;

    // ─── Helpers ───────────────────────────────────────────────

    private function createUser(array $overrides = []): User
    {
        return User::factory()->create($overrides);
    }

    private function createAdmin(): User
    {
        return $this->createUser(['is_admin' => true]);
    }

    private function createSuperAdmin(): User
    {
        return $this->createUser(['is_admin' => true, 'is_superadmin' => true]);
    }

    private function actAs(?User $user): self
    {
        return $user ? $this->actingAs($user) : $this;
    }

    // ─── Middleware / Authorization ────────────────────────────

    public function test_unauthenticated_user_cannot_access_admin_routes()
    {
        $routes = [
            'GET /api/admin/users',
            'GET /api/admin/users/salvation',
            'GET /api/admin/ministry-requests',
            'GET /api/admin/user/1',
        ];

        foreach ($routes as $route) {
            [$method, $uri] = explode(' ', $route, 2);
            $this->json($method, $uri)->assertUnauthorized();
        }
    }

    public function test_unauthenticated_user_cannot_access_superadmin_routes()
    {
        $routes = [
            'POST /api/admin/user/1/make-admin',
            'POST /api/admin/user/1/remove-admin',
        ];

        foreach ($routes as $route) {
            [$method, $uri] = explode(' ', $route, 2);
            $this->json($method, $uri)->assertUnauthorized();
        }
    }

    public function test_regular_user_gets_forbidden_on_admin_routes()
    {
        $user = $this->createUser();
        $this->actAs($user);

        $this->getJson('/api/admin/users')->assertForbidden();
        $this->getJson('/api/admin/users/salvation')->assertForbidden();
        $this->getJson('/api/admin/ministry-requests')->assertForbidden();
        $this->getJson('/api/admin/user/1')->assertForbidden();
    }

    public function test_regular_user_gets_forbidden_on_superadmin_routes()
    {
        $user = $this->createUser();
        $this->actAs($user);

        $target = $this->createUser();
        $this->postJson("/api/admin/user/{$target->id}/make-admin")->assertForbidden();
        $this->postJson("/api/admin/user/{$target->id}/remove-admin")->assertForbidden();
    }

    public function test_admin_can_access_admin_routes_but_not_superadmin_routes()
    {
        $admin = $this->createAdmin();
        $this->actAs($admin);

        $this->getJson('/api/admin/users')->assertOk();
        $this->getJson('/api/admin/users/salvation')->assertOk();
        $this->getJson('/api/admin/ministry-requests')->assertOk();

        $target = $this->createUser();
        $this->postJson("/api/admin/user/{$target->id}/make-admin")->assertForbidden();
        $this->postJson("/api/admin/user/{$target->id}/remove-admin")->assertForbidden();
    }

    public function test_superadmin_can_access_all_routes()
    {
        $super = $this->createSuperAdmin();
        $this->actAs($super);

        $this->getJson('/api/admin/users')->assertOk();
        $this->getJson('/api/admin/users/salvation')->assertOk();
        $this->getJson('/api/admin/ministry-requests')->assertOk();

        $target = $this->createUser();
        $this->postJson("/api/admin/user/{$target->id}/make-admin")->assertOk();
    }

    // ─── GET /api/admin/users ─────────────────────────────────

    public function test_users_returns_all_users_with_correct_fields()
    {
        $this->actAs($this->createSuperAdmin());

        User::factory(3)->create();

        $response = $this->getJson('/api/admin/users');
        $response->assertOk();
        $response->assertJsonCount(4, 'users');
        $response->assertJsonStructure([
            'users' => ['*' => ['id', 'firstName', 'lastName', 'email', 'is_admin', 'is_superadmin', 'prayed_salvation_prayer', 'telephone', 'localisation', 'created_at']],
        ]);
    }

    // ─── GET /api/admin/users/salvation ───────────────────────

    public function test_salvation_returns_only_users_who_prayed()
    {
        $this->actAs($this->createSuperAdmin());

        $this->createUser(['prayed_salvation_prayer' => true]);
        $this->createUser(['prayed_salvation_prayer' => false]);
        $this->createUser(['prayed_salvation_prayer' => true]);

        $response = $this->getJson('/api/admin/users/salvation');
        $response->assertOk();
        $response->assertJsonCount(2, 'users');
    }

    // ─── GET /api/admin/ministry-requests ─────────────────────

    public function test_ministry_requests_returns_all_requests_with_user()
    {
        $this->actAs($this->createSuperAdmin());

        $user = $this->createUser();
        MinistryRequest::factory()->count(2)->create(['user_id' => $user->id]);

        $response = $this->getJson('/api/admin/ministry-requests');
        $response->assertOk();
        $response->assertJsonCount(2, 'requests');
        $response->assertJsonStructure([
            'requests' => ['*' => ['id', 'user_id', 'nom', 'email', 'ministry_name', 'message', 'user' => ['id', 'firstName', 'lastName', 'email']]],
        ]);
    }

    // ─── GET /api/admin/user/{id} ─────────────────────────────

    public function test_user_detail_returns_user()
    {
        $this->actAs($this->createSuperAdmin());

        $target = $this->createUser(['bio' => 'Test bio']);
        $response = $this->getJson("/api/admin/user/{$target->id}");
        $response->assertOk();
        $response->assertJsonPath('user.id', $target->id);
        $response->assertJsonPath('user.bio', 'Test bio');
        $response->assertJsonStructure([
            'user' => ['id', 'firstName', 'lastName', 'email', 'is_admin', 'is_superadmin', 'prayed_salvation_prayer', 'telephone', 'localisation', 'bio', 'created_at', 'updated_at'],
        ]);
    }

    public function test_user_detail_returns_404_for_nonexistent_user()
    {
        $this->actAs($this->createSuperAdmin());
        $this->getJson('/api/admin/user/99999')->assertNotFound();
    }

    // ─── POST /api/admin/user/{id}/make-admin ─────────────────

    public function test_make_admin_promotes_user()
    {
        $this->actAs($this->createSuperAdmin());

        $target = $this->createUser();
        $this->assertFalse($target->fresh()->is_admin);

        $response = $this->postJson("/api/admin/user/{$target->id}/make-admin");
        $response->assertOk();
        $this->assertTrue($target->fresh()->is_admin);
    }

    public function test_make_admin_fails_for_superadmin_target()
    {
        $this->actAs($this->createSuperAdmin());

        $target = $this->createSuperAdmin();
        $this->postJson("/api/admin/user/{$target->id}/make-admin")->assertForbidden();
    }

    public function test_make_admin_returns_404_for_nonexistent_user()
    {
        $this->actAs($this->createSuperAdmin());
        $this->postJson('/api/admin/user/99999/make-admin')->assertNotFound();
    }

    // ─── POST /api/admin/user/{id}/remove-admin ───────────────

    public function test_remove_admin_demotes_user()
    {
        $this->actAs($this->createSuperAdmin());

        $target = $this->createAdmin();

        $response = $this->postJson("/api/admin/user/{$target->id}/remove-admin");
        $response->assertOk();
        $this->assertFalse($target->fresh()->is_admin);
    }

    public function test_remove_admin_fails_for_superadmin_target()
    {
        $this->actAs($this->createSuperAdmin());

        $target = $this->createSuperAdmin();
        $this->postJson("/api/admin/user/{$target->id}/remove-admin")->assertForbidden();
    }

    public function test_remove_admin_returns_404_for_nonexistent_user()
    {
        $this->actAs($this->createSuperAdmin());
        $this->postJson('/api/admin/user/99999/remove-admin')->assertNotFound();
    }
}
