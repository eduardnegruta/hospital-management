<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Okipa\LaravelModelJsonStorage\ModelJsonStorage;

class Patient extends Model
{
    use ModelJsonStorage;

    /**
     * @var array
     */
    protected $fillable = [
        'name',
        'height',
        'weight',
    ];

    /**
     * @var array
     */
    protected $filterable = [
        'id',
        'name',
        'height',
        'created_at',
        'updated_at',
    ];

    /**
     * @var string
     */
    public $defaultOrderByColumn = 'created_at';

    /**
     * @var string
     */
    public $defaultOrderByDirection = 'asc';

    /**
     * @var int
     */
    public $perPage = 10;

    /**
     * @var int
     */
    public $minPerPage = 5;

    /**
     * @var int
     */
    public $maxPerPage = 100;

    /**
     * @param $column
     * @return string
     */
    public function getOrderByColumn($column = '')
    {
        if (in_array($column, $this->filterable))
        {
            return $column;
        }

        return $this->defaultOrderByColumn;
    }

    /**
     * @param $direction
     * @return string
     */
    public function getOrderByDirection($direction = '')
    {
        if ($direction == 'asc' || $direction == 'desc')
        {
            return $direction;
        }

        return $this->defaultOrderByDirection;
    }

    /**
     * @param $perPage
     * @return int
     */
    public function getPatientsPerPage($perPage = -1)
    {
        if ($perPage) {
            if ($perPage >= $this->minPerPage && $perPage <= $this->maxPerPage) {
                return $perPage;
            }
        }

        return $this->perPage;
    }
}
