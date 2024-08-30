<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MemberPlan;
use App\Models\PenaltySetting;
use App\Models\Payment;

class PaymentController extends Controller
{
   /**
    * Payment All Index
    */
    public function index(){
        $members = MemberPlan::orderBy('member_id','DESC')->get();
        $penalties = PenaltySetting::get();
        return view('backend.payments.index', compact('members','penalties'));
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

    /**
     * Payment Store
     */
    public function store(Request $request){

        $payment = new Payment();
        $payment->payment_date =  now();
        $payment->installment_amount =  $request->monthly_installment;
        $payment->penalty_amount =  $request->penalty_amount;
        $payment->total_amount =  $request->total_amount;
        $payment->installment_id =  $request->installment_id;
        $payment->save();
        
        return response()->json([
            'status'=> 200,
            'message' => "Payment Created Successfully!",
        ]);

    }
}
