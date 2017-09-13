set -e

script_dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
template_file="$script_dir/../template/template.json"
stack_name=DbsCloudFormationStack
bucket=artifact-manas

if [ -z "$AWS_DEFAULT_REGION" ]; then
    aws_region="ap-southeast-1"
else
    aws_region=$AWS_DEFAULT_REGION
fi
echo $stack_name
echo $aws_region
echo $template_file

aws cloudformation package --template $template_file --s3-bucket $bucket --output json > packaged-template.json
