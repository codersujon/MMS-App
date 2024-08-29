// Jquery Ready
$(document).ready(function(){

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $("#form").on("submit", function(e){
        e.preventDefault();
            
        var formData = new FormData($("#form")[0]);

        $.ajax({
            url: "/members/store",
            method: "POST",
            data: formData,
            dataType: "JSON",
            contentType: false, // Illegal Innovation error if not written
            processData:false,  // Illegal Innovation error if not written
            success: function(data){
                if(data.status == 200){
                     // Handle success
                    Swal.fire({
                        title: 'Success!',
                        text: data.message,
                        icon: 'success',
                        showConfirmButton: true,
                        timer: 1000
                    }).then(() => {
                        location.reload(); // Reload the page
                    });
                    
                    $('#form')[0].reset();
                }
            }
        });
    })  

});