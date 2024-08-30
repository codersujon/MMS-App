<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PenaltySetting extends Model
{
    use HasFactory;
    protected $fillable = ['penalty_percentage', 'penalty_days'];
}
