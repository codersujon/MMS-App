<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PenaltySetting;

class PenaltySettingController extends Controller
{
    /**
     * Index
     */
    public function index(){
        return view('backend.penalty_settings.index');
    }

    /**
     * Penalty Store
     */

     public function store(Request $request){
        $penalty = new PenaltySetting();
        $penalty->penalty_percentage = $request->penalty_days;
        $penalty->penalty_days = $request->penalty_perc;
        $penalty->save();

        return response()->json([
            'status'=> 200,
            'message' => "Penalty Created Successfully!",
        ]);
     }
}
