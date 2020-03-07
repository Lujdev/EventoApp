@extends('layouts.main')


@section('content')
    <body>

        <div class="wrapper">
            <div class="section">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <br>
                            <br>
                            <br>
                            <table id="myTable" class="table  table-striped table-bordered" style="width:100%">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>id</th>
                                        <th>Nombre</th>
                                        <th>Email</th>
                                        <th>Bloque</th>
                                        <th>Disciplina</th>
                                        <th>Horario</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs4/dt-1.10.20/b-1.6.1/fc-3.3.0/fh-3.1.6/r-2.2.3/sl-1.3.1/datatables.min.css"/>
 
        <script type="text/javascript" src="https://cdn.datatables.net/v/bs4/dt-1.10.20/b-1.6.1/fc-3.3.0/fh-3.1.6/r-2.2.3/sl-1.3.1/datatables.min.js"></script>
        
        <script>
            $(document).ready(function () {

                $.ajaxSetup({
                    headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });

               var t =  $('#myTable').DataTable({
                    "ajax": {
                        "url": "{{ route('getregistros') }}",
                        "type": "GET",
                        "dataSrc": ""
                    },
                    "language": {
                        "sProcessing":     "Procesando...",
                        "sLengthMenu":     "Mostrar _MENU_ registros",
                        "sZeroRecords":    "No se encontraron resultados",
                        "sEmptyTable":     "Ningún dato disponible en esta tabla",
                        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
                        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                        "sInfoPostFix":    "",
                        "sSearch":         "Buscar:",
                        "sUrl":            "",
                        "sInfoThousands":  ",",
                        "sLoadingRecords": "Cargando...",
                        "oPaginate": {
                            "sFirst":    "Primero",
                            "sLast":     "Último",
                            "sNext":     "Siguiente",
                            "sPrevious": "Anterior"
                        },
                        "oAria": {
                            "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                        },
                        "buttons": {
                            "copy": "Copiar",
                            "colvis": "Visibilidad"
                        }
                    },
                    "columnDefs": [ {
                        "searchable": false,
                        "orderable": false,
                        "targets": 0
                    },
                    {
                        "targets": [ 1 ],
                        "visible": false,
                        "searchable": false
                    } ],
                    "columns": [  
                        {data: null},
                        { data: 'id', name: 'id'},
                        { data: 'nombre', name: 'nombre', autoWidth: true },
                        { data: 'email', name: 'email',  autoWidth: true },
                        { data: 'bloque', name: 'bloque',  autoWidth: true },
                        { data: 'disciplina', name: 'disciplina',  autoWidth: true },
                        { data: 'horario', name: 'horario',  autoWidth: true },
                        {"data":null,"defaultContent":"<button>View</button>"}
                     ],
                     "order": [[ 1, 'desc' ]]
                })

                t.on( 'order.dt search.dt', function () {
                    t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                        cell.innerHTML = i+1;
                    } );
                } ).draw();


            });
        </script>
    </body>

    <style>
        body{
            color: #000000 !important;
        }
    </style>
@endsection 