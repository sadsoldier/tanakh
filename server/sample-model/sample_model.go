/*
 * Copyright 2019 Oleg Borodin  <borodin@unix7.org>
 */


package sampleModel

import (
    "log"
    "github.com/jmoiron/sqlx"
)

const schema = `
    CREATE TABLE IF NOT EXISTS "tax" (
        "maingroup"     TEXT,
        "subgroup"      TEXT,
        "area"          TEXT,
        "region"        TEXT,
        "year"          INTEGER,
        "value"         NUMERIC
    )`

type Model struct {
    db *sqlx.DB
}

type Sample struct {
    Subgroup    string  `db:"subgroup"  json:"subgroup"`
    Point0      int     `db:"point0"    json:"point0"`
    Point1      int     `db:"point1"    json:"point1"`
    Point2      int     `db:"point2"    json:"point2"`
    Point3      int     `db:"point3"    json:"point3"`
    Point4      int     `db:"point4"    json:"point4"`
    Point5      int     `db:"point5"    json:"point5"`
}

type Result struct {
    Region      string      `json:"region"`
    Subgroups   []Sample    `json:"subgroups"`
    Total       []Sample    `json:"total"`
}

type Request struct {
    Region      string      `json:"region"`
}

func (this *Model) Migrate() error {
    _, err := this.db.Exec(schema)
    if err != nil {
        log.Println(err)
        return err
    }
    return nil
}

func (this *Model) GetRegions() ([]string, error) {
    regionQuery := `SELECT DISTINCT region FROM tax ORDER BY region`
    var regions []string
    err := this.db.Select(&regions, regionQuery)
    return regions, err
}

func (this *Model) GetSamples(listRequest *Request) (*Result, error) {

    subgroupsQuery :=
        `SELECT
            subgroup,
            max(CASE WHEN year = 2010 THEN value END) as point0,
            max(CASE WHEN year = 2011 THEN value END) as point1,
            max(CASE WHEN year = 2012 THEN value END) as point2,
            max(CASE WHEN year = 2013 THEN value END) as point3,
            max(CASE WHEN year = 2014 THEN value END) as point4,
            max(CASE WHEN year = 2015 THEN value END) as point5
        FROM tax
          WHERE region LIKE $1
          GROUP BY subgroup`

    var subgroups []Sample

    err := this.db.Select(&subgroups, subgroupsQuery, listRequest.Region)
    if err != nil {
        return nil, err
    }

    totalQuery := `
        SELECT
            "dummy" as subgroup,
            sum(point0) as point0,
            sum(point1) as point1,
            sum(point2) as point2,
            sum(point3) as point3,
            sum(point4) as point4,
            sum(point5) as point5
        FROM (SELECT
                    subgroup,
                    max(CASE WHEN year = 2010 THEN value END) as point0,
                    max(CASE WHEN year = 2011 THEN value END) as point1,
                    max(CASE WHEN year = 2012 THEN value END) as point2,
                    max(CASE WHEN year = 2013 THEN value END) as point3,
                    max(CASE WHEN year = 2014 THEN value END) as point4,
                    max(CASE WHEN year = 2015 THEN value END) as point5
                FROM tax
                WHERE region
                LIKE $1
                GROUP BY subgroup
        )`
    var total []Sample
    err = this.db.Select(&total, totalQuery, listRequest.Region)
    if err != nil {
        return nil, err
    }

    var result = Result {
        Region:     listRequest.Region,
        Subgroups:  subgroups,
        Total:      total,
    }
    return &result, err
}

func New(db *sqlx.DB) *Model {
    model := Model{
        db: db,
    }
    return &model
}
