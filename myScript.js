// index
$(document).ready(function () {
    $("#bloodstream").hide().delay(500).slideDown(1000);
});

// istrazivacke grupe

$(document).ready(function () {
    $('#wrapper_grupe > div').hide();
    $('#imunologija').show();
    $('.grupa').change(function () {
        $('#wrapper_grupe > div').hide();
        var selectedGroup = $(this).val();
        $('#' + selectedGroup).show();
    });
});

// projekti
$(document).ready(function () {
    $(".article").hide();
    $("#btnImuno").click(function () {
        $(".article").hide();
        $(".projekti_imuno").show();
    });

    $("#btnIshrana").click(function () {
        $(".article").hide();
        $(".projekti_ishrana").show();
    });

    $("#btnKardio").click(function () {
        $(".article").hide();
        $(".projekti_kardio").show();
    });
});

// rezervacije

function proveraImena() {
    var str = document.getElementById("ime").value;
    var regex = /^[A-Z]{1}[a-z]+$/;
    var found = str.search(regex);
    var poruka = document.getElementById("spanIme");
    if (found == -1) {
        poruka.innerHTML = "Neispravan unos";
        poruka.style.color = "red";
        console.log("Nema poklapanja");
    }
    else {
        poruka.innerHTML = "Ispravan unos";
        poruka.style.color = "green";
        console.log(found[0]);
    }
}

function proveraPrezimena() {
    var str = document.getElementById("prezime").value;
    var regex = /^[A-Z]{1}[a-z]+$/;
    var found = str.search(regex);
    var poruka = document.getElementById("spanPrezime");
    if (found == -1) {
        poruka.innerHTML = "Neispravan unos";
        poruka.style.color = "red";
        console.log("Nema poklapanja");
    }
    else {
        poruka.innerHTML = "Ispravan unos";
        poruka.style.color = "green";
        console.log(found[0]);
    }
}

function proveraEmaila() {
    var str = document.getElementById("email").value;
    var regex = /^[a-zA-Z0-9]+\.[a-zA-Z0-9]+@imi\.ac\.rs$/;
    var found = str.search(regex);
    var poruka = document.getElementById("spanEmail");
    if (found == -1) {
        poruka.innerHTML = "Neispravan unos";
        poruka.style.color = "red";
        console.log("Nema poklapanja");
    }
    else {
        poruka.innerHTML = "Ispravan unos";
        poruka.style.color = "green";
        console.log(found[0]);
    }
}

function proveraTelefona() {
    var str = document.getElementById("telefon").value;
    var regex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    var found = str.search(regex);
    var poruka = document.getElementById("spanTelefon");
    if (found == -1) {
        poruka.innerHTML = "Neispravan unos";
        poruka.style.color = "red";
        console.log("Nema poklapanja");
    }
    else {
        poruka.innerHTML = "Ispravan unos";
        poruka.style.color = "green";
        console.log(found[0]);
    }
}

function validacijaForme() {
    // obavezna polja za istrazivaca
    var ime = document.getElementById('ime').value;
    var prezime = document.getElementById('prezime').value;
    var email = document.getElementById('email').value;
    var telefon = document.getElementById('telefon').value;

    // obavezna polja za instrument
    var tipHromatografije = document.getElementById('tip_hromatografije').value;
    var pocetakRada = document.getElementById('pocetak_rada').value;
    var krajRada = document.getElementById('kraj_rada').value;

    // validacija
    if (ime === '' || prezime === '' || email === '' || telefon === '' ||
        tipHromatografije === '' || pocetakRada === '' || krajRada === '') {
        alert('Molimo popunite sva obavezna polja (polja sa zvezdicom).');
        return false;
    }

    // ako validacija prodje nastavlja se sa konverzijom podataka u JSON i cuva u local storage
    var formaPodaci = {
        ime: ime,
        prezime: prezime,
        email: email,
        telefon: telefon,
        tipHromatografije: tipHromatografije,
        pocetakRada: new Date(pocetakRada).toISOString(),
        krajRada: new Date(krajRada).toISOString()
    };

    var jsonPodaci = JSON.stringify(formaPodaci);
    localStorage.setItem('formaPodaci', jsonPodaci);

    prikazPodataka();

    return false;
}

function prikazPodataka() {
    var skladisteniPodaci = localStorage.getItem('formaPodaci');
    var podaci = JSON.parse(skladisteniPodaci);

    var displayDiv = document.getElementById('prikazPodataka');

    displayDiv.innerHTML = '<h4>Poslati podaci:</h4><pre>' + JSON.stringify(podaci, null, 2) + '</pre>';
}

// slanje podataka na server
function slanjePodatakaFormeNaServer() {
    var skladisteniPodaci = localStorage.getItem('formaPodaci');

    if (!skladisteniPodaci) {
        console.error("Podaci forme ne postoje.");
        return;
    }

    var podaci = JSON.parse(skladisteniPodaci);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'mojPHPfajl.php', true);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Podaci su uspesno poslati na server.');
        } else {
            console.error('Greska prilikom slanja podataka na server. Status: ' + xhr.status);
        }
    };

    var jsonPodaci = JSON.stringify(podaci);
    xhr.send(jsonPodaci);
}