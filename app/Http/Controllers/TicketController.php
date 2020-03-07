<?php

namespace App\Http\Controllers;

use App\Actividades;
use DateTime;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use RealRashid\SweetAlert\Facades\Alert;

class TicketController extends Controller
{
    public function index()
    {
        $actividades = DB::table('actividades')->groupBy('disciplina')->get('disciplina');
        // Alert::success('Success Title','Success Message');
        // alert()->success('test1', 'test2');
  
        return view('home', ['actividades' => $actividades]);
        
    }

    public function registro(Request $request){

        if($request){

            $validator = Validator::make($request->all(), [
                'nombre' => 'required|max:50|min:2',
                'apellido' => 'required|max:50|min:2',
                'email' => 'required|email:rfc,dns|max:50',
                'fecha' => 'required|date_format:Y-m-d',
                'horario_radio' => 'required|integer',
                ]);

                if ($validator->fails()) {

                    alert()->error('Error', $validator->messages()->all()[0]);
                    return back();
                }            
                    
            try {

                $nombre = $request->input('nombre');
                $apellido = $request->input('apellido');
                $email = $request->input('email');
                $fechaN = $request->input('fecha');
                $actividad = $request->input('horario_radio');

                $registro = DB::statement('call registrar_participante(?,?,?,?,?)', [
                    $email, $nombre, $apellido, $fechaN, $actividad
                ]);

                if($registro){
                
                  alert()->success('Exito', 'Registro Exitoso.');
                  return redirect(route('hometickets'));

                }

            } catch (Exception $th) {
                
                alert()->warning('Error', $th->getMessage());
                return back();
            }
        }

    }

    public function gethorario(Request $request)
    {

        try {

            $Horario = [];

            if (!empty($request)) {

                $horarios = DB::table('actividades')->where('disciplina', $request->disciplina)->orderBy('id', 'asc')->get();
                foreach ($horarios as $horario) {

                    $cupo = getCupos($horario->id);

                    $var = [
                        'id' =>  $horario->id,
                        'horario' =>  $horario->horario,
                        'bloque' =>  $horario->bloque,
                        'cupo' =>  ($horario->cupo - $cupo),
                    ];

                    $Horario[] = $var;
                }

                if(!empty($Horario)){

                    return json_encode($Horario);

                }
            }

        } catch (Exception $th) {
            return $th->getMessage();
        }
    }

    public function getregistros(Request $request){

        try {
            $registros = DB::table('registros')
            ->select('registros.id as id', 'participantes.nombres as nombre','participantes.email as email','actividades.bloque as bloque','actividades.disciplina as disciplina','actividades.horario as horario')
            ->join('participantes', 'participantes.id', '=', 'registros.id_participante')
            ->join('actividades', 'actividades.id', '=', 'registros.id_actividad')
            ->get();

            if($registros){
                return json_encode($registros);
            }

        } catch (Exception $e) {
            
            return $e->getMessage();

        }
    }
}

function getCupos($id){

    try {

        $cupos = DB::table('registros')
        ->join('actividades', 'registros.id_actividad', '=', 'actividades.id')
        ->where('registros.id_actividad', $id)
        ->count();

        if(!empty($cupos)){
            return $cupos;
        }

    } catch (Exception $th) {
        return $th->getMessage();
    }
}