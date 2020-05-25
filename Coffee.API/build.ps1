cd ..\Coffee.WebApp\
Write-Host "Building Client"
iex "ng build --prod=true" 
cd ..\Coffee.API\
Write-Host "Building API"
iex "npx tsc" 
#iex  "robocopy . Z:\DockerBuildDestination\coffee.API\. /IS /S /XD node_modules"
iex  "robocopy . Z:\DockerBuildDestination\coffee.API\. /IS /S"