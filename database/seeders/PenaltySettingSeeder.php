<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PenaltySetting;

class PenaltySettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PenaltySetting::create([
            'penalty_percentage' => 5,
            'penalty_days' => 2,
        ]);
    }
}
