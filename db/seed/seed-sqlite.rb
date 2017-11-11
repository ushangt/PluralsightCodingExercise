#!/usr/bin/env ruby

require 'sqlite3'
require 'csv'

COLUMNS = {
 id: 'INTEGER PRIMARY KEY autoincrement', question: 'varchar(512)', answer: 'varchar(100)', distractors: 'varchar(100)'
}

INSERT_COLUMNS = {
 question: 'varchar(512)', answer: 'varchar(100)', distractors: 'varchar(100)'
}

db = SQLite3::Database.new '../plural-sight.sqlite3'

res = db.execute 'SELECT name FROM sqlite_master WHERE type = "table"'

if res.flatten.include?('entries')
  puts 'table `entries` already exists — dropping'
  db.execute 'DROP TABLE entries'
end

columns = COLUMNS.inject('') do |memo, pair|
  name, type = pair
  memo += "\n#{name} #{type},"
end.chomp(',')


db.execute <<-SQL
  create table entries ( #{columns} );
SQL

print "\nWorking..."

dir = File.dirname(File.expand_path(__FILE__))
lineno = 1
CSV.foreach(File.join(dir, 'code_challenge_question_dump.csv'), {:encoding => 'ISO8859-1', :col_sep => '|'}) do |row|
  lineno = $.

  next if lineno == 1
  print '.' if lineno % 1000 == 0

  sql = <<-SQL
    INSERT INTO entries ( #{INSERT_COLUMNS.keys.join(', ')} )
    VALUES ( #{(['?'] * INSERT_COLUMNS.size).join(', ')} )
SQL
  db.execute sql, row
end

print "done."
print "\n#{lineno} entries imported."
