# Require any additional compass plugins here.
# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "css"
sass_dir = "sass"
images_dir = "images"
javascripts_dir = "js"
fonts_dir = "_fonts"
relative_assets = true

line_comments = false
output_style = :compressed
# output_style = :compact :compressed :nested :expanded
# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true




# - - - - - - - - - - - - -

# Autoprefixer

# - - - - - - - - - - - - -

# Add Autoprefixer Support
# https://github.com/ai/autoprefixer#usage
require 'autoprefixer-rails'

on_stylesheet_saved do |file|
  css = File.read(file)
  File.open(file, 'w') do |io|
    io << AutoprefixerRails.process(css)
  end
end
