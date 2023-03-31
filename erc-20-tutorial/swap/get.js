function myFunction() {
    const re = document.getElementById("numberid").value;
    alert("您将为交换代币付出"+re+"枚token1")
    return re
}

function addFunction(){
    const re1 = document.getElementById("numberid1").value;
    const re2 = document.getElementById("numberid2").value;
    alert("re1是"+re1+"re2是"+re2)
    return [re1,re2]
}