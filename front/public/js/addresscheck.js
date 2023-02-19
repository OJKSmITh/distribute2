const element_layer = document.getElementById('layer');
const element_access = document.getElementById('eventAddress');

    function closeDaumPostcode() {
        element_layer.style.display = 'none';
        element_access.readOnly = true;
    }

    function CheckAddress() {
        new daum.Postcode({
            oncomplete: function(data) {
                var addr = ''; 
                var extraAddr = '';

                
                if (data.userSelectedType === 'R') {
                    console.log('road',addr)
                    addr = data.roadAddress;
                } else { 
                    console.log('jibun',addr)
                    addr = data.jibunAddress;
                }
                if(data.userSelectedType === 'R'){
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraAddr += data.bname;
                    }
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    if(extraAddr !== ''){
                        extraAddr = ' (' + extraAddr + ')';
                    }
                    document.getElementById("eventAddress").value = extraAddr;
                } else {
                    document.getElementById("eventAddress").value = '';
                }
                document.getElementById("eventAddress").value = addr;
                document.getElementById("inputAddress").focus();
                element_layer.style.display = 'none';
            },
            width : '100%',
            height : '100%',
            maxSuggestItems : 5
        }).embed(element_layer);
        element_layer.style.display = 'block';
        initLayerPosition1();
    }

    function initLayerPosition1(){
        const width = 500;
        const height = 600;
        const borderWidth = 1;

        element_layer.style.width = width + 'px';
        element_layer.style.height = height + 'px';
        element_layer.style.border = borderWidth + 'px solid';
        element_layer.style.left = (((window.innerWidth || document.documentElement.clientWidth) - width)/1.5 - borderWidth) + 'px';
        element_layer.style.top = (((window.innerHeight || document.documentElement.clientHeight) - height)/2 - borderWidth) + 'px';
    }