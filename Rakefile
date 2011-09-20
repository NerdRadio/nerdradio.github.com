require 'rake/clean'

desc "Parse haml layouts"
task :parse_haml do
  print "Parsing Haml layouts..."
  system(%{
    cd _layouts/haml && 
    for f in *.haml; do [ -e $f ] && haml $f ../${f%.haml}.html; done
  })
  puts "done."
end

desc "Parse sass css"
task :parse_sass do
  print "Parsing Sass _includes..."
  system(%{
    cd _includes/sass && 
    for f in *.scss; do [ -e $f ] && sass $f ../${f%.scss}.css; done
  })
  puts "done."
end

desc "Generate HAML & SASS"
task :haml_sass do
  Rake::Task["parse_haml"].invoke
  Rake::Task["parse_sass"].invoke
end

desc "Create per tag pages and rest"
task :default => [:haml_sass]