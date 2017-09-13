set -e

script_dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
template_file="$script_dir/../template/template.json"
stack_name=DbsCloudFormationStack

if [ -z "$AWS_DEFAULT_REGION" ]; then
    aws_region="ap-southeast-1"
else
    aws_region=$AWS_DEFAULT_REGION
fi
echo $stack_name
echo $aws_region
echo $template_file

sudo aws cloudformation deploy --stack-name $stack_name \
    --template-file $template_file \
    --capabilities CAPABILITY_IAM