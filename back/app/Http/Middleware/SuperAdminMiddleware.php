<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SuperAdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user || !$user->is_superadmin) {
            return response()->json(['error' => 'Accès non autorisé. Super admin seulement.'], 403);
        }

        return $next($request);
    }
}
