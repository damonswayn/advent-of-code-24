#!/usr/bin/env sh

# Create the advent of code solution source directories given the input number
# Usage: ./make_src_dir.sh <day_number> where <day_number> is the day of the
# advent of code challenge as 2 digits (01-25)

# Function to get the highest day number from the src directory
get_highest_day_number() {
    find src -maxdepth 1 -type d -regex 'src/[0-9][0-9][ab]' | \
    sed -E 's/src\/([0-9][0-9])[ab]/\1/' | \
    sort -n | \
    tail -n 1
}

# Check if the number of arguments is correct
if [ "$#" -ne 1 ]; then
    highest_day=$(get_highest_day_number)
    if [ -z "$highest_day" ]; then
      echo "No day number provided and no existing directories found. Please provide a day number."
      exit 1
    fi
    day_number=$(printf "%02d" "$((10#$highest_day + 1))")
else
    day_number=$1
fi

# Check if the day number is valid
if ! echo "$day_number" | grep -Eq '^([012][0-9])$'; then
    echo "Invalid day number. Please enter a number between 01 and 25"
    exit 1
fi

echo "Starting advent of code template generation for day $day_number..."

PART_ONE_NAME="${day_number}a"
PART_TWO_NAME="${day_number}b"

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