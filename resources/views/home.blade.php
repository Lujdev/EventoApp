@extends('layouts.main')

@section('content')

<div class="wrapper">
    <div class="page-header page-header-small">
        <div class="page-header-image" data-parallax="true" style="background-image: url({{asset('images/bg6.jpg')}});">
        </div>
        <div class="content-center">
            <div class="container">
                <h1 class="title">Eventos Deportivos</h1>
            </div>
        </div>
    </div>
    <div class="section section-about-us" style="background: rgb(41, 41, 49);">
        <div class="container">
            <div class="row">
                <div class="col-md-8 ml-auto mr-auto text-center">
                    <h2 class="title">Who we are?</h2>
                    <h5 class="description">According to the National Oceanic and Atmospheric Administration, Ted,
                        Scambos, NSIDClead scentist, puts the potentially record low maximum sea ice extent tihs year
                        down to low ice extent in the Pacific and a late drop in ice extent in the Barents Sea.</h5>
                </div>
            </div>
            <div class="separator separator-primary"></div>
        </div>
    </div>
    <div class="section section-register" style="background-color: rgb(41, 41, 49);">
        <div class="container">
            <div class="row">
                <div class="card card-signup" style="max-width: 50%;" data-background-color="night">
                    <form class="form" action="{{ route('registro') }}" method="POST">
                      @csrf
                      <div class="card-header text-center">
                        <h3 class="card-title title-up">Datos Personales</h3>
                      </div>
                      <div class="card-body">
                        <div class="input-group no-border">
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="now-ui-icons users_circle-08"></i>
                            </span>
                          </div>
                          <input type="text" name="nombre" maxlength="50" class="form-control" placeholder="Ingrese su nombre">
                        </div>
                        <div class="input-group no-border">
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="now-ui-icons text_caps-small"></i>
                            </span>
                          </div>
                          <input type="text" name="apellido" maxlength="50" placeholder="Ingrese su apellido" class="form-control">
                        </div>
                        <div class="input-group no-border">
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="now-ui-icons ui-1_email-85"></i>
                            </span>
                          </div>
                          <input type="text" name="email" maxlength="50" class="form-control" placeholder="Email...">
                        </div>
                        <div class="input-group no-border">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="now-ui-icons ui-1_calendar-60"></i>
                              </span>
                            </div>
                          <input type="text" name="fecha" maxlength="50" class="form-control date-picker" value="{{date('Y-m-d')}}" data-date-format="yyyy-mm-dd" data-datepicker-color="primary">
                        </div>
                        <div class="input-group no-border">
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="now-ui-icons sport_user-run"></i>
                            </span>
                          </div>
                          <select class="form-control" style="background-color: #3a3a42;" name="actividad" id="actividad">
                            <option value="0" disabled selected>Seleccionar Actividad</option>
                            @if (!empty($actividades))
                                @foreach ($actividades as $actividad)
                                  <option value="{{$actividad->disciplina}}">{{$actividad->disciplina}}</option>
                                @endforeach
                            @endif
                          </select>
                        </div>
                        <div id="horario">
                          <div class="horarios_select"></div>
                        </div>
                        
                      
                        
                        <!-- If you want to add a checkbox to this form, uncomment this code -->
                        <!-- <div class="checkbox">
                                      <input id="checkboxSignup" type="checkbox">
                                          <label for="checkboxSignup">
                                          Unchecked
                                          </label>
                                      </div> -->
                      </div>
                      <div class="card-footer text-center">
                        <button class="btn btn-neutral btn-round btn-lg" style="color: #21201f;" type="submit">Enviar</button>
                      </div>
                    </form>
                  </div>
            </div>
        </div>
    </div>
</div>

@include('sweetalert::alert')
<script>
  ;
((d, w, c) => {

    const horario = d.getElementById('horario');

    form = d.forms[0];
    respuesta = d.querySelector('.Response');

    let token = d.querySelector('meta[name="csrf-token"]').getAttribute('content');

    d.addEventListener('change', e => {
        if(e.target.matches('#actividad')){

            let disciplina = e.target.value;

            axios.post('/ticket/gethorario', {
              disciplina: disciplina,
            })
            .then(function (response) {
              c(response.data);
              let resp = response.data;

              horario.innerHTML = "";
              resp.forEach(hor => {
                horario.innerHTML += `<div class="form-check form-check-radio">
                  <label class="form-check-label" style="color: white;">
                    <input class="form-check-input" type="radio" name="horario_radio" id="horario_${hor.id}" value="${hor.id}">` +
                      `<span class="form-check-sign"></span>`+
                       `${hor.bloque} ` + `${hor.horario} ` + `Cupos Disponibles: ${hor.cupo}` +
                  `</label>
                </div>`;       
              });
            })
            .catch(function (error) {
              c(error);
            });

        }
    })
    d.addEventListener('submit', e => {

    })

    d.addEventListener('click', e => {

    })

}) (document, window, console.log);

</script>
@endsection




