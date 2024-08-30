<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->date('payment_date');
            $table->decimal('installment_amount', 10, 2);
            $table->decimal('penalty_amount', 10, 2);
            $table->decimal('total_amount', 10, 2);
            $table->foreignId('installment_id')->references('id')->on('member_plans');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
