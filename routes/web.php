<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes(['register' => false]);
Route::get('/', 'TicketController@index')->name('hometickets');
Route::group(['prefix' => 'ticket'], function () {
    Route::post('gethorario', 'TicketController@gethorario')->name('gethorario');
    Route::post('registro', 'TicketController@registro')->name('registro');
    Route::get('getregistros', 'TicketController@getregistros')->name('getregistros');
});
Route::group(['prefix' => 'admin'], function () {
    Route::get('/home', 'AdminController@index')->name('indexpanel')->middleware('auth');
});