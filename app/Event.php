<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
  protected $fillable = ['title', 'days_of_week', 'start_recur', 'end_recur'];

  protected $visible = ['title', 'start_recur', 'end_recur', 'days_of_week'];

  public function getDaysOfWeekAttribute($value)
  {
    return unserialize($value);
  }
}
