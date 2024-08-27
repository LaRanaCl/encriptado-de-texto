document.getElementById('addRow').addEventListener('click', function() {
    const table = document.getElementById('nnaTable').getElementsByTagName('tbody')[0];
    const rowCount = table.rows.length;
    const row = table.insertRow(rowCount);
    
    const cell1 = row.insertCell(0);
    cell1.innerHTML = rowCount + 1;
    
    const cell2 = row.insertCell(1);
    const nombres = document.createElement('input');
    nombres.type = 'text';
    nombres.name = 'nombres';
    nombres.required = true;
    cell2.appendChild(nombres);
    
    const cell3 = row.insertCell(2);
    const apellidos = document.createElement('input');
    apellidos.type = 'text';
    apellidos.name = 'apellidos';
    apellidos.required = true;
    cell3.appendChild(apellidos);
    
    const cell4 = row.insertCell(3);
    const fechaNacimiento = document.createElement('input');
    fechaNacimiento.type = 'date';
    fechaNacimiento.name = 'fechaNacimiento';
    fechaNacimiento.required = true;
    cell4.appendChild(fechaNacimiento);
    
    const cell5 = row.insertCell(4);
    const sexo = document.createElement('select');
    sexo.name = 'sexo';
    sexo.required = true;
    const option1 = document.createElement('option');
    option1.value = 'Masculino';
    option1.text = 'Masculino';
    const option2 = document.createElement('option');
    option2.value = 'Femenino';
    option2.text = 'Femenino';
    sexo.add(option1);
    sexo.add(option2);
    cell5.appendChild(sexo);
    
    const cell6 = row.insertCell(5);
    const identificacion = document.createElement('input');
    identificacion.type = 'text';
    identificacion.name = 'identificacion';
    identificacion.placeholder = 'xxxxxxxx-x (sin puntos)';
    identificacion.required = true;
    cell6.appendChild(identificacion);
    
    const cell7 = row.insertCell(6);
    const fechaIngreso = document.createElement('input');
    fechaIngreso.type = 'date';
    fechaIngreso.name = 'fechaIngreso';
    fechaIngreso.required = true;
    cell7.appendChild(fechaIngreso);
    
    const cell8 = row.insertCell(7);
    const motivoIngreso = document.createElement('input');
    motivoIngreso.type = 'text';
    motivoIngreso.name = 'motivoIngreso';
    motivoIngreso.required = true;
    cell8.appendChild(motivoIngreso);
});

document.getElementById('nnaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const rows = document.querySelectorAll('#nnaTable tbody tr');
    let valid = true;
    
    rows.forEach(row => {
        const identificacion = row.querySelector('input[name="identificacion"]').value;
        if (!Fn.validaRut(identificacion)) {
            valid = false;
            alert("Formato de RUT debe ser xxxxxxxx-x sin puntos");
        }
    });
    
    if (valid) {
        // Aquí va el código para guardar la información en la base de datos local
        // Por ejemplo, podrías hacer una llamada a una API o guardar en LocalStorage
        alert("Datos guardados correctamente");
    }
});

const Fn = {
    validaRut: function(rutCompleto) {
        if (!/^[0-9]+-[0-9kK]{1}$/.test(rutCompleto))
            return false;
        var tmp = rutCompleto.split('-');
        var digv = tmp[1];
        var rut = tmp[0];
        if (digv == 'K') digv = 'k';
        return (Fn.dv(rut) == digv);
    },
    dv: function(T) {
        var M = 0,
            S = 1;
        for (; T; T = Math.floor(T / 10))
            S = (S + T % 10 * (9 - M++ % 6)) % 11;
        return S ? S - 1 : 'k';
    }
}
