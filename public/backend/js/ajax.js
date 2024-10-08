// Jquery Ready
$(document).ready(function () {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    //Add Member
    $("#form").on("submit", function (e) {
        e.preventDefault();

        var formData = new FormData($("#form")[0]);

        $.ajax({
            url: "/members/store",
            method: "POST",
            data: formData,
            dataType: "JSON",
            contentType: false, // Illegal Innovation error if not written
            processData: false, // Illegal Innovation error if not written
            success: function (data) {
                if (data.status == 200) {
                    // Handle success
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.onmouseenter = Swal.stopTimer;
                          toast.onmouseleave = Swal.resumeTimer;
                        }
                      });
                      Toast.fire({
                        icon: "success",
                        title: data.message
                      });

                    memberList();
                    $("#crud-modal").addClass('hidden');
                    $(".inset-0").removeClass();
                    $('#form')[0].reset();
                }
            }
        });
    })

    //Member List
    memberList();
    function memberList() {
        $.ajax({
            url: "/members/list",
            type: "GET",
            success: function (response) {
                if (response.status == 200) {
                    let Data = "";
                    $.each(response.AllData, function (key, val) {
                        Data += `

                        <tr class="border-b dark:border-gray-700">
                            <td class="px-4  py-1">${key+1}</td>
                            <td scope="row"
                                class="px-4 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                ${val.fullName}
                            </td>
                            <td class="px-4 py-1">${val.gender}</td>
                            <td class="px-4 py-1">${val.email}</td>
                            <td class="px-4 py-1">${val.phone}</td>
                            <td class="px-4 py-1">
                                <img src="backend/uploads/${val.image}"
                                    alt="" width="60px" height="60px">
                            </td>
                            <td class="px-4 py-1">${val.join_date}</td>
                            <td class="px-4 py-1">
                                ${ val.status = 1 ? 
                                    '<a href="" class="bg-green-100 text-green-600 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-700 dark:text-green-300">Active</a>'
                                    :
                                    '<a href="" class="bg-red-100 text-red-600 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Inactive</a>'
                                }
                            </td>
                            <td class="px-4 py-1">${val.expire_date}</td>

                            <td class="px-4 py-1">
                                    <button type="button" id="deleteMember" value="${val.id}" class="p-2 mr-1 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>

                                    </button>
                               
                                 <button type="button" id="deleteMember" value="${val.id}" class="p-2 mr-1 text-xs font-medium text-center inline-flex items-center text-white bg-red-600 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        
                        `;
                    });

                    $(".memberList").html(Data);
                }
            }
        });
    }

    // Delete Member
    $(document).on("click", "#deleteMember", function (e) {
        e.preventDefault();
        let memberID = $(this).val();

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1a56db",
            cancelButtonColor: "#e02424",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                // Ajax Delete
                $.ajax({
                    url: "/members/destroy/" + memberID,
                    type: "GET",
                    success: function (response) {
                        if (response.status == 200) {
                            memberList();
                        }
                    }
                });

                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                    showConfirmButton: true,
                });
            }
        });

    });

    // Get Monthly Installment
    $(document).on("keyup click", "#total_amount, #plans_duration", function(){
        let total_amount = $("#total_amount").val();
        let plans_duration = $("#plans_duration").val();
        let monthly_installment = (total_amount / plans_duration);
        if(total_amount && plans_duration){
            $("#monthly_installment").val(Math.round(monthly_installment));
        }else{
            $("#monthly_installment").val("");
        }
    })

    // Add New Plans
    $("#plans_form").on("submit", function (e) {
        e.preventDefault();

        var formData = new FormData($("#plans_form")[0]);

        $.ajax({
            url: "/members/plans/store",
            method: "POST",
            data: formData,
            dataType: "JSON",
            contentType: false, // Illegal Innovation error if not written
            processData: false, // Illegal Innovation error if not written
            success: function (data) {
                if (data.status == 200) {

                    // Handle success
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.onmouseenter = Swal.stopTimer;
                          toast.onmouseleave = Swal.resumeTimer;
                        }
                      });
                      Toast.fire({
                        icon: "success",
                        title: data.message
                      });
                    
                    plansData()

                    $("#plans-modal").addClass('hidden');
                    $(".inset-0").removeClass();
                    $('#plans_form')[0].reset();
                }
            }
        });
    })

    plansData()
    // plansData
    function plansData(){
        $.ajax({
            url: "/members/plans/all",
            type: "GET",
            success: function (response) {
                if (response.status == 200) {
                    let Data = "";
                    $.each(response.AllData, function (key, val) {
                        Data += `

                        <tr class="border-b dark:border-gray-700">
                            <td class="px-4  py-1">${key+1}</td>
                            <td class="px-4 py-1">${val.member.fullName}</td>
                            <td class="px-4 py-1">${val.payment_date}</td>
                            <td class="px-4 py-1">${val.total_amount} </td>
                            <td class="px-4 py-1">${val.plans_duration} Months</td>
                            <td class="px-4 py-1">${val.monthly_installment}</td>
                            <td class="px-4 py-1">${val.plans_expire_date}</td>
                            <td class="px-4 py-1">
                                ${ val.status = 1 ? 
                                    '<a href="" class="bg-green-100 text-green-600 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-700 dark:text-green-300">Active</a>'
                                    :
                                    '<a href="" class="bg-red-100 text-red-600 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Inactive</a>'
                                }
                            </td>

                            <td class="px-4 py-1">
                                    <button type="button" id="deleteMember" value="${val.id}" class="p-2 mr-1 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>

                                    </button>
                               
                                 <button type="button" id="deletePlans" value="${val.id}" class="p-2 mr-1 text-xs font-medium text-center inline-flex items-center text-white bg-red-600 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        
                        `;
                    });

                    $(".InstallmentsList").html(Data);
                }
            }
        });
    }

    //Delete Plans
    $(document).on("click", "#deletePlans", function (e) {
        e.preventDefault();
        let plansID = $(this).val();

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1a56db",
            cancelButtonColor: "#e02424",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                // Ajax Delete
                $.ajax({
                    url: "/members/plans/destroy/" + plansID,
                    type: "GET",
                    success: function (response) {
                        if (response.status == 200) {
                            plansData();
                        }
                    }
                });

                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                    showConfirmButton: true,
                });
            }
        });

    });

    // Add Penalty
    $("#penalty_form").on("submit", function (e) {
        e.preventDefault();

        var formData = new FormData($("#penalty_form")[0]);

        $.ajax({
            url: "/penalty/store",
            method: "POST",
            data: formData,
            dataType: "JSON",
            contentType: false, // Illegal Innovation error if not written
            processData: false, // Illegal Innovation error if not written
            success: function (data) {
                if (data.status == 200) {

                    // Handle success
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.onmouseenter = Swal.stopTimer;
                          toast.onmouseleave = Swal.resumeTimer;
                        }
                      });
                      Toast.fire({
                        icon: "success",
                        title: data.message
                      });

                    penaltyList();
                    
                    $("#penalty-modal").addClass('hidden');
                    $(".inset-0").removeClass();
                    $('#penalty_form')[0].reset();
                }
            }
        });
    })

    // Penalty List
    penaltyList();
    function penaltyList(){
        $.ajax({
            url: "/penalty/all",
            type: "GET",
            success: function (response) {
                if (response.status == 200) {
                    let Data = "";
                    $.each(response.AllData, function (key, val) {
                        Data += `

                        <tr class="border-b dark:border-gray-700">
                            <td class="px-4  py-1">${key+1}</td>
                            <td class="px-4 py-1">${val.penalty_days} Days</td>
                            <td class="px-4 py-1">${val.penalty_percentage} %</td>
                           
                            <td class="px-4 py-1">
                                    <button type="button" id="deleteMember" value="${val.id}" class="p-2 mr-1 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>

                                    </button>
                               
                                 <button type="button" id="deletePenalty" value="${val.id}" class="p-2 mr-1 text-xs font-medium text-center inline-flex items-center text-white bg-red-600 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        
                        `;
                    });

                    $(".PenaltyList").html(Data);
                }
            }
        }); 
    }

    // Delete Penalty
    $(document).on("click", "#deletePenalty", function (e) {
        e.preventDefault();
        let penaltyID = $(this).val();

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1a56db",
            cancelButtonColor: "#e02424",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                // Ajax Delete
                $.ajax({
                    url: "/penalty/destroy/" + penaltyID,
                    type: "GET",
                    success: function (response) {
                        if (response.status == 200) {
                            penaltyList();
                        }
                    }
                });

                Swal.fire({
                    title: "Deleted!",
                    text: "Penalty Deleted Successfully!",
                    icon: "success",
                    showConfirmButton: true,
                });
            }
        });

    });

    // GET INSTALLMENT ALL PLANS
    $(document).on("change", "#member_id", function(){
        var member_id = $(this).val();

        $.ajax({
            url: "/get-plans/" + member_id,
            type: "GET",
            dataType: "JSON",
            success: function(response){
                var Data =`<option value="">Select Plans Id</option>`;
                $.each(response.allData, function(key, value){
                    Data += `<option value="${value.id}">#Id: ${ value.id } [ Total Amount: ${value.total_amount} ]</option>`;
                });
                $("#plans_id").html(Data);
            }
       });
    });


     // GET INSTALLMENT AMOUNT WITH THE HELP OF PLANS ID
     $(document).on("change", "#plans_id", function(){
        var plans_id = $(this).val();
        
       $.ajax({
            url: "/get-installment/" + plans_id,
            type: "GET",
            dataType: "JSON",
            success: function(response){
                console.log(response.allData);
                var monthly_installment ="";
                var installment_id = ""
                $.each(response.allData, function(key, value){
                    monthly_installment += `${value.monthly_installment}`;
                    installment_id += `${value.id}`;
                });
                $("#monthly_installment").val(parseInt(monthly_installment));
                $("#installment_id").val(installment_id);
            }
       });
    });

    // GET PENALTY PERCHANTAGE AND CALCULATE PENALTY AMOUNT AND TOTAL AMOUNT
    $(document).on("change", "#penalty_days", function(){
        let penalty_percentage = $(this).val();
        let monthly_installment = parseFloat($("#monthly_installment").val());

        const penalty_amount =  parseFloat((monthly_installment * penalty_percentage/100));
        $("#penalty_amount").val(penalty_amount);

        const total_amount = parseFloat(monthly_installment + penalty_amount);
        $("#grand_total").val(Math.floor(total_amount));
        
    });

    // ADD PAYMENTS
    $("#payments_form").on("submit", function (e) {
        e.preventDefault();
        let installment_id = $("#installment_id").val();
        let monthly_installment = $("#monthly_installment").val();
        let penalty_amount = $("#penalty_amount").val();
        let grand_total = $("#grand_total").val();

        $.ajax({
            url: "/payments/store",
            method: "POST",
            data: {
                installment_id: installment_id,
                monthly_installment: monthly_installment,
                penalty_amount: penalty_amount,
                total_amount: grand_total
            },
            dataType: "JSON",
            success: function (data) {
                if (data.status == 200) {

                    // Handle success
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.onmouseenter = Swal.stopTimer;
                          toast.onmouseleave = Swal.resumeTimer;
                        }
                      });
                      Toast.fire({
                        icon: "success",
                        title: data.message
                      });
                    
                    PaymentList();
                   
                    $("#payments-modal").addClass('hidden');
                    $(".inset-0").removeClass();
                    $('#payments_form')[0].reset();
                }
            }
        });
    });

    // Payment List
    PaymentList();
    function PaymentList(){
        $.ajax({
            url: "/payments/list",
            type: "GET",
            success: function (response) {
                if (response.status == 200) {
                    let Data = "";
                    $.each(response.AllData, function (key, val) {
                        Data += `

                        <tr class="border-b dark:border-gray-700">
                            <td class="px-4  py-1">${key+1}</td>
                            <td class="px-4 py-1">${val.installment_id}</td>
                            <td class="px-4 py-1">${val.payment_date}</td>
                            <td class="px-4 py-1">${val.installment_amount}</td>
                            <td class="px-4 py-1">${val.penalty_amount}</td>
                            <td class="px-4 py-1">${val.total_amount}</td>
                            <td class="px-4 py-1">
                            <button type="button" id="#" value="${val.id}" class="p-2 mr-1 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 8.25.22-.22a.75.75 0 0 1 1.28.53v6.441c0 .472.214.934.64 1.137a3.75 3.75 0 0 0 4.994-1.77c.205-.428-.152-.868-.627-.868h-.507m-6-2.25h7.5M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                </svg>
                            </button>
                               
                            <button type="button" id="deletePayment" value="${val.id}" class="p-2 mr-1 text-xs font-medium text-center inline-flex items-center text-white bg-red-600 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                        </button>
                            </td>
                        </tr>
                        
                        `;
                    });

                    $(".PaymentList").html(Data);
                }
            }
        }); 
    }

    // Delete Payment
    $(document).on("click", "#deletePayment", function (e) {
        e.preventDefault();
        let paymentID = $(this).val();

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1a56db",
            cancelButtonColor: "#e02424",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                // Ajax Delete
                $.ajax({
                    url: "/payments/destroy/" + paymentID,
                    type: "GET",
                    success: function (response) {
                        if (response.status == 200) {
                            PaymentList();
                        }
                    }
                });

                Swal.fire({
                    title: "Deleted!",
                    text: "Payment Deleted Successfully!",
                    icon: "success",
                    showConfirmButton: true,
                });
            }
        });

    });

});
