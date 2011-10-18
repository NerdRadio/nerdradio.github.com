# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'rake', :task => 'parse_haml' do
	watch(%r{_layouts/haml/})
end

guard 'rake', :task => 'parse_haml_includes' do
	watch(%r{_includes/haml/})
end

guard 'rake', :task => 'parse_sass' do
	watch(%r{_includes/sass/})
end

guard 'rake', :task => 'parse_coffee' do
	watch(%r{_coffee/})
end