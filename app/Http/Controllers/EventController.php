<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Event;
use Carbon\Carbon;

class EventController extends Controller
{
    public function index()
    {
      $events = Event::all();

      return json_encode($this->map($events));
    }

    public function store(Request $request)
    {
       $validatedData = $request->validate([
          'title' => 'required',
          'start_recur' => 'required',
          'end_recur' => 'required',
          'daysOfWeek' => 'required'
        ]);

        $event = Event::create([
          'title' => $validatedData['title'],
          'start_recur' => Carbon::parse($validatedData['start_recur'])->format('Y-m-d'),
          'end_recur' => Carbon::parse($validatedData['end_recur'])->format('Y-m-d'),
          'days_of_week' => serialize($validatedData['daysOfWeek'])
        ]);

        return response()->json('Event created!');
    }

    public function map($data)
    {
      $arr = [];

      foreach ($data as $value) {
        $arr[] = ["title" => $value->title, "startRecur" => $value->start_recur, "endRecur" => $value->end_recur, "allDay" => true, "daysOfWeek" => $value->days_of_week];
      }

      $arr[0]['group_id'] = "blueEvents";

      return $arr;

    }
}
