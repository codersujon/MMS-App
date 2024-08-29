<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Member>
 */
class MemberFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'fullName' => fake()->name(),
            'dob' => fake()->date(),
            'gender' => fake()->randomElement(['male','female','others']),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'image' => fake()->imageUrl('70', '70'),
            'occupation' => fake()->randomElement(['Job-Holder','Housewife','Business Man', 'Govt. Employee']),
            'address' => fake()->streetAddress(),
            'join_date' => fake()->date(),
            'expire_date' => fake()->date(),
        ];
    }
}
