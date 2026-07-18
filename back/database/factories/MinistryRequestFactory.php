<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class MinistryRequestFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'nom' => fake()->firstName(),
            'email' => fake()->safeEmail(),
            'ministry_name' => fake()->word(),
            'message' => fake()->sentence(),
        ];
    }
}
