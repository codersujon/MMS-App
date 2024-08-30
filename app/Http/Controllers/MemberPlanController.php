<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Member;
use App\Models\MemberPlan;

class MemberPlanController extends Controller
{
    /**
     * Index
     */
    public function index(){
        $members = Member::orderBy('fullName','ASC')->get();
        return view('backend.members_plans.index', compact('members'));
    }

    /**
     * Members Plans Store
     */
    public function store(Request $request){

        $member = new MemberPlan();
        $member->member_id = $request->member_id;
        $member->total_amount = $request->total_amount;
        $member->plans_duration = $request->plans_duration;
        $member->payment_date = date('Y-m-d', strtotime($request->plans_date));
        $member->monthly_installment = $request->monthly_installment;
        $member->plans_expire_date = date('Y-m-d', strtotime($request->expire_date));
        $member->save();
   
        return response()->json([
            'status'=> 200,
            'message' => "Members Plans Created!",
        ]);
    }

    /**
     * All Plans
     */
    public function allPlans(){
        $plans = MemberPlan::latest()->get();
        return response()->json([
            'status'=> 200,
            'AllData' => $plans,
        ]);
    }

    /**
     * Remove Member Plans
     */
    public function destroyPlans(string $id)
    {
        $plan = MemberPlan::findOrFail($id);
        $plan->delete();

        return response()->json([
            'status'=> 200,
            'message' => "Members Plans Deleted!",
        ]);
    }
}
