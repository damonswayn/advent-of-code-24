#!/usr/bin/env sh

# Create the advent of code solution source directories given the input number
# Usage: ./make_src_dir.sh <day_number> where <day_number> is the day of the
# advent of code challenge as 2 digits (01-25)

# Check if the number of arguments is correct
if [ "$#" -ne 1 ]; then
    echo "Usage: ./make_src_dir.sh <day_number>"
    exit 1
fi

# Check if the day number is valid
if ! echo "$1" | grep -Eq '^([012][0-9])$'; then
    echo "Invalid day number. Please enter a number between 01 and 25"
    exit 1
fi

echo "Starting advent of code template generation for day $1..."

PART_ONE_NAME="$1a"
PART_TWO_NAME="$1b"

# Create the source directory
mkdir -p "src/$PART_ONE_NAME" "src/$PART_TWO_NAME"

echo "Created src/$PART_ONE_NAME and src/$PART_TWO_NAME directories"

# Create the source files
cp .template/xxx.test.ts "src/$PART_ONE_NAME/$PART_ONE_NAME.test.ts"
sed -i '' -e "s/<<PART_NAME>>/$PART_ONE_NAME/g" "src/$PART_ONE_NAME/$PART_ONE_NAME.test.ts"
echo "Created src/$PART_ONE_NAME/$PART_ONE_NAME.test.ts"

cp .template/solve.ts "src/$PART_ONE_NAME/solve.ts"
sed -i '' -e "s/<<PART_NAME>>/$PART_ONE_NAME/g" "src/$PART_ONE_NAME/solve.ts"
echo "Created src/$PART_ONE_NAME/solve.ts"

cp .template/test.txt "src/$PART_ONE_NAME/test.txt"
echo "Created src/$PART_ONE_NAME/test.txt"
cp .template/xxx.input.txt "src/$PART_ONE_NAME/$PART_ONE_NAME.input.txt"
echo "Created src/$PART_ONE_NAME/$PART_ONE_NAME.input.txt"

cp .template/xxx.ts "src/$PART_ONE_NAME/$PART_ONE_NAME.ts"
echo "Created src/$PART_ONE_NAME/$PART_ONE_NAME.ts"

echo "Finished creating src/$PART_ONE_NAME"

cp .template/xxx.test.ts "src/$PART_TWO_NAME/$PART_TWO_NAME.test.ts"
sed -i '' -e "s/<<PART_NAME>>/$PART_TWO_NAME/g" "src/$PART_TWO_NAME/$PART_TWO_NAME.test.ts"
echo "Created src/$PART_TWO_NAME/$PART_TWO_NAME.test.ts"

cp .template/solve.ts "src/$PART_TWO_NAME/solve.ts"
sed -i '' -e "s/<<PART_NAME>>/$PART_TWO_NAME/g" "src/$PART_TWO_NAME/solve.ts"
echo "Created src/$PART_TWO_NAME/solve.ts"

cp .template/test.txt "src/$PART_TWO_NAME/test.txt"
echo "Created src/$PART_TWO_NAME/test.txt"
cp .template/xxx.input.txt "src/$PART_TWO_NAME/$PART_TWO_NAME.input.txt"
echo "Created src/$PART_TWO_NAME/$PART_TWO_NAME.input.txt"

cp .template/xxx.ts "src/$PART_TWO_NAME/$PART_TWO_NAME.ts"
echo "Created src/$PART_TWO_NAME/$PART_TWO_NAME.ts"

echo "Finished creating src/$PART_TWO_NAME"

echo "Generation complete!"