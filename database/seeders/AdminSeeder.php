<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'email'=> "admin@mmsapp.com",
            'password'=> Hash::make('12345678'),
            'email_verified_at'=> now(),
            'isAdmin' => 1
        ]);
    }
}
