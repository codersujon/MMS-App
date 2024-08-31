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
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->string('fullName', 100);
            $table->date('dob');
            $table->enum('gender', ['male', 'female', 'others']);
            $table->string('email', 100);
            $table->string('phone', 50);
            $table->string('image')->nullable();
            $table->string('occupation')->nullable();
            $table->longtext('address');
            $table->date('join_date');
            $table->boolean('status')->default(1);
            $table->date('expire_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
