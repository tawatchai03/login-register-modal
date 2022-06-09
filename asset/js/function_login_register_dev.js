	//function parameter
	// TODO: CDN
	window.cmBaseApiUrl = 'https://api-gw-py-prod.lavagaming.com'
	    window.spinixBaseApiUrl = 'https://backend.spinix.com'
	    window.spinixLobbyUrl = 'https://www.spinix.com'
	    window.spinixLobbyTestUrl = 'https://test.spinix.com'
	console.log('function login v.1.0.0 build 09-06-2022')

	var getUrlParameter = function getUrlParameter(sParam) {
	    var sPageURL = window.location.search.substring(1),
	        sURLVariables = sPageURL.split('&'),
	        sParameterName,
	        i;

	    for (i = 0; i < sURLVariables.length; i++) {
	        sParameterName = sURLVariables[i].split('=');

	        if (sParameterName[0] === sParam) {
	            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
	        }
	    }
	};

	var getRandomString = function getRandomString(length) {
	    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	    var result = '';
	    for (var i = 0; i < length; i++) {
	        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
	    }
	    return result;
	}

	function BindReg(ElementArr, RegURL) {
	    for (j = 0; j < ElementArr.length; j++) {
	        //Check Element Exist first
	        var element = document.getElementById(ElementArr[j]);
	        if (typeof(element) != 'undefined' && element != null) {
	            // Exists.
	            document.getElementById(ElementArr[j]).addEventListener("click", function() {
	                window.location.assign(RegURL);
	            });
	            console.log("El: #" + ElementArr[j] + " Binding done.");
	        } else {
	            //Not Exist
	            console.log('ERROR: #' + ElementArr[j] + ' EL NOT EXIST.');
	        }
	    }
	}

	/**--------------------------------------------------------------------- */
	document.addEventListener('DOMContentLoaded', function() {

	    //document loadded done start
	    //step 1: initial site config
	    console.log('site config header.');
	    var Sitebrand_id = window.sitebrandId
	    var Sitebrand_register_id = "00X00";
	    async function initialSiteConfig() {
	        var requestOptions = {
	            method: 'GET',
	            redirect: 'follow'
	        };
	        const response = await fetch(window.cmBaseApiUrl + "/brands-setting/" + Sitebrand_id, requestOptions);
	        const _siteconfig = await response.json();
	        return _siteconfig;
	    }
	    //step 2: 
	    initialSiteConfig().then(_siteconfig => {
	        _siteconfig; // fetched config
	        action = _siteconfig.setting.setting_items_register;
	        Sitebrand_register_id = GetBrandRegisterID();
	        var ServerURL = window.spinixLobbyUrl + '/';
	        var iFrameBackgroundColor = window.iFrameBackgroundColor
	        var SiteRegisterReferral = localStorage.getItem('referral');
	        var currentkey = BuildKey();
	        var SpinixDiamondURL = BuildSpinixDiamondLink(ServerURL);
	        var SpinixRegisterURL = BuildSpinixRegisterLink(ServerURL)

	        //var SetLoginElementLink = window.btnLoginIds;
	        var SetRegisElementLink = window.registerIds;

	        window.spinixIFrameUrlSource = SpinixDiamondURL
	        window.spinixRegisterURLSource = SpinixRegisterURL

	        var element = document.getElementById('advanced_iframe');
	        if (typeof(element) != 'undefined' && element != null) {
	            // your code here
	            console.log('Found advance iframe !');

	            var loc = window.spinixIFrameUrlSource;
	            document.getElementById('advanced_iframe').setAttribute('src', loc);

	            console.log('advance iframe bind done!')

	        } else {
	            console.log('have a good day')
	                // finish code test
	        } //element exist check

	        function GetBrandRegisterID() {
	            let _registerid = '';
	            //let _registerid = _siteconfig.setting.setting_items_register;

	            const settingItemId = _siteconfig.setting.setting_items_register;
	            const agentObj = _siteconfig.setting_items.find((v) => v._id === settingItemId);
	            const agentId = agentObj.agent_register;
	            _registerid = agentId;
	            return _registerid;
	        }

	        function BuildSpinixRegisterLink(_registerURL) {
	            //TODO
	            //step 1 : standard url
	            _registerURL += '?key=' + currentkey + '&b=' + Sitebrand_id + '&a=' + Sitebrand_register_id;
	            //step 2 : custom param
	            //Referral member
	            if (typeof(getUrlParameter('r')) != "undefined" &&
	                getUrlParameter('r') !== true &&
	                getUrlParameter('r') !== null) {
	                //console.log("Found Referral Exist!" );
	                //TODO
	                localStorage.setItem('referral', getUrlParameter('r'));
	                SiteRegisterReferral = localStorage.getItem('referral');
	                _registerURL += '&r=' + SiteRegisterReferral;
	            } else {
	                //Check Referral from localstorage
	                if (localStorage.getItem('referral') != "" &&
	                    localStorage.getItem('referral') !== true &&
	                    localStorage.getItem('referral') !== null) {
	                    console.log("Found Referral on LocalStorage");
	                    //TODO
	                    _registerURL += '&r=' + localStorage.getItem('referral');

	                } else {
	                    //console.log("No Referral Exist!" );
	                    //TODO
	                    //NOTHING HERE
	                }
	            }
	            //step 3 : export
	            return _registerURL;
	        }

	        function BuildSpinixDiamondLink(_serverURL) {
	            //TODO
	            //step 1 : standard url
	            _serverURL += 'slot/index.html?key=' + currentkey + '&b=' + Sitebrand_id + '&a=' + Sitebrand_register_id;
	            //step 2 : custom param
	            //Referral member
	            if (typeof(getUrlParameter('r')) != "undefined" &&
	                getUrlParameter('r') !== true &&
	                getUrlParameter('r') !== null) {
	                //console.log("Found Referral Exist!" );
	                //TODO
	                localStorage.setItem('referral', getUrlParameter('r'));
	                SiteRegisterReferral = localStorage.getItem('referral');
	                _serverURL += '&r=' + SiteRegisterReferral;
	            } else {
	                //Check Referral from localstorage
	                if (localStorage.getItem('referral') != "" &&
	                    localStorage.getItem('referral') !== true &&
	                    localStorage.getItem('referral') !== null) {
	                    console.log("Found Referral on LocalStorage");
	                    //TODO
	                    _serverURL += '&r=' + localStorage.getItem('referral');

	                } else {
	                    //console.log("No Referral Exist!" );
	                    //TODO
	                    //NOTHING HERE
	                }
	            }
	            //SpinixDiamond background color
	            _serverURL += '&bg=' + iFrameBackgroundColor;
	            //step 3 : export
	            return _serverURL;
	        }

	        function getRandomString(length) {
	            var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	            var result = '';
	            for (var i = 0; i < length; i++) {
	                result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
	            }
	            return result;
	        }

	        function BuildKey() {
	            let _key = '';
	            if (typeof(getUrlParameter('r')) != "undefined" &&
	                getUrlParameter('r') !== true &&
	                getUrlParameter('r') !== null) {
	                //console.log("Found Referral Exist!" );
	                //TODO
	                SiteRegisterReferral = getUrlParameter('r');
	                _key = Sitebrand_id + '-' + Sitebrand_register_id + '-' + SiteRegisterReferral + '-' + Date.now() + '-' + getRandomString(7);
	            } else {
	                //console.log("No Referral Exist!" );
	                //TODO
	                _key = Sitebrand_id + '-' + Sitebrand_register_id + '-' + SiteRegisterReferral + '-' + Date.now() + '-' + getRandomString(7);
	            }
	            return _key
	        }


	        //register
	        for (j = 0; j < SetRegisElementLink.length; j++) {
	            //Check Element Exist first
	            var element = document.getElementById(SetRegisElementLink[j]);
	            if (typeof(element) != 'undefined' && element != null) {
	                // Exists.
	                document.getElementById(SetRegisElementLink[j]).addEventListener("click", function() {
	                    window.location.assign(SpinixRegisterURL);
	                });
	                console.log("El: #" + SetRegisElementLink[j] + " Binding done.");
	            } else {
	                //Not Exist
	                console.log('ERROR: #' + SetRegisElementLink[j] + ' EL NOT EXIST.');
	            }
	        }

	        console.log('Register url : ' + SpinixRegisterURL);
	        console.log('Diamond frame url : ' + SpinixDiamondURL);
	        console.log('Brand_id (fixed) : ' + Sitebrand_id);
	        console.log('Agent_id (fetch) : ' + Sitebrand_register_id);
	        console.log('Referal_id (optional) : ' + SiteRegisterReferral);

	    }); //siteconfig response ends

	    //document loadded don finish


	}, false);
	/**--------------------------------------------------------------------- */
