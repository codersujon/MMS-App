<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Member;

class MemberController extends Controller
{
    /**
     * Manage members
     */
    public function index()
    {
        
        return view('backend.members.index');
    }

    /**
     * All Member List
     */
    public function memberList()
    {
        $members = Member::latest()->get();
        return response()->json([
            'status'=> 200,
            'AllData' => $members,
        ]);
    }

    /**
     * Store Members
     */
    public function store(Request $request)
    {

        $member = new Member();

         // FOR IMAGE 
        $customName = "";
        if($image = $request->file('image')){
            $customName = uniqid() . "-" . time() . "." .$image->getClientOriginalExtension();
            $image = $image->move(public_path("backend/uploads/"), $customName);
        }else{
            $customName =  $member->image;
        }

        $member->fullName = $request->fullname;
        $member->dob = date("Y-m-d", strtotime($request->dob));
        $member->gender = $request->gender;
        $member->email = $request->email;
        $member->phone = $request->phone;
        $member->image = $customName;
        $member->occupation = ucwords($request->occupation);
        $member->address = $request->address;
        $member->join_date = date("Y-m-d", strtotime($request->joining_date));
        $member->expire_date = date("Y-m-d", strtotime($request->expire_date));
        $member->save();

        return response()->json([
            'status'=> 200,
            'message' => "Member Created Successfully!",
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $member = Member::findOrFail($id);
        @unlink(public_path("backend/uploads/".$member->image));
        $member->delete();

        return response()->json([
            'status'=> 200,
            'message' => "Member Deleted Successfully!",
        ]);
    }
}
