<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Faker\Factory;

class RegistroSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create(); 

        DB::statement('call registrar_participante(?,?,?,?,?)', [
            $faker->freeEmail(),
            $faker->firstName('male'|'female'),
            $faker->lastName(),
            $faker->date('Y-m-d','now'),
            random_int(1, 12)
        ]);
    }
}
