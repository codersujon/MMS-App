<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MemberPlan;

class PaymentController extends Controller
{
   /**
    * Payment All Index
    */
    public function index(){
        $members = MemberPlan::orderBy('member_id','DESC')->get();
        return view('backend.payments.index', compact('members'));
    }


    /**
     * Get Installment
     */
    public function getInstallment(String $id){
        $Installments = MemberPlan::where('member_id', $id)->get();
        return response()->json([
            'status' => 200,
            'allData' => $Installments
        ]);
    }

}
