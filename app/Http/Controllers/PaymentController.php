<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Member;
use App\Models\MemberPlan;
use App\Models\PenaltySetting;
use App\Models\Payment;

class PaymentController extends Controller
{
   /**
    * Payment All Index
    */
    public function index(){
        $members = Member::withWhereHas('memberplan')->get();
        $penalties = PenaltySetting::get();
        return view('backend.payments.index', compact('members','penalties'));
    }

    /**
     * Get Plans ID
     */
    public function getPlans(String $id){
        $plans = MemberPlan::where('member_id', $id)->get();
        return response()->json([
            'status' => 200,
            'allData' => $plans
        ]);
    }

    /**
     * Get Installment
     */
    public function getInstallment(String $id){
        $Installments = MemberPlan::where('id', $id)->get();
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

    /**
     * All Payment List
     */
    public function allPayments(){
        $payments = Payment::with('memberplan')->get();
        return response()->json(['status'=> 200, 'AllData' => $payments]);
    }


    /**
     * Payment Destroy
     */
    public function destroy(String $id){
        $payment = Payment::findOrFail($id);
        $payment->delete();

        return response()->json([
            'status'=> 200,
            'message' => "Payment Deleted!",
        ]);
    }
}
