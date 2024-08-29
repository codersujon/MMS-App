<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Member;

class MemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Member::create([
            'fullName' => 'Md Sujon Ahmed',
            'dob' => '1995-02-25',
            'gender' => 'male',
            'email' => 'info@codersujon.com',
            'phone' => '01680366446',
            'occupation' => 'Job-holder',
            'address' => 'Jurain, Dhaka-1311',
            'join_date' => '2024-08-25',
            'status' => 1,
            'expire_date' => '2025-08-25',
        ]);
    }
}
