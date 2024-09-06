<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MemberPlan extends Model
{
    use HasFactory;
    protected $fillable = ['amount', 'plans_duration', 'payment_date'];

    public function member(){
        return $this->belongsTo(Member::class);
    }

    public function payment(){
        return $this->hasMany(Payment::class);
    }
}
