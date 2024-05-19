document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname === '/reservas.html') {
        fetch('/api/reservas')
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector('#reservasTable tbody');
                tableBody.innerHTML = ''; // Clear existing content
                data.reservas.forEach(reserva => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${reserva.nome}</td>
                        <td>${reserva.instalacao}</td>
                        <td>${reserva.data}</td>
                        <td>${reserva.hora}</td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar reservas:', error);
            });
    }
});

document.getElementById('reservaForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const instalacao = document.getElementById('instalacao').value;
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;

    fetch('/reservar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, instalacao, data, hora })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Reserva realizada com sucesso!');
        } else {
            alert('Erro na reserva: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro na reserva');
    });
});
