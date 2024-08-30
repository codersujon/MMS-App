<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    protected $fillable = [
        'payment_date', 
        'installment_amount', 
        'penalty_amount', 
        'total_amount', 
        'installment_id'
    ];
}
