import os

# Define paths and summary file
ROOT_DIR = "."  # Root directory of the project
SUMMARY_FILE = "summary.txt"

# Define files or directories to exclude
EXCLUDE_LIST = [".git", "file_summary.py", ".github"]

def should_include_file(file_path):
    """
    Determine whether a file should be included in the summary based on the exclude list.
    """
    return all(exclude not in file_path for exclude in EXCLUDE_LIST)

def get_files_to_include():
    """
    Collect all files from the root directory while respecting exclude/include rules.
    """
    files_to_include = []

    # Walk through the root directory
    for root, _, files in os.walk(ROOT_DIR):
        for file in files:
            file_path = os.path.join(root, file)
            if should_include_file(file_path):
                files_to_include.append(file_path)

    return files_to_include

def write_summary_file(files_to_include):
    """
    Write a summary of all included files into the summary file.
    """
    with open(SUMMARY_FILE, 'w') as summary:
        for file_path in files_to_include:
            summary.write(f"File: {file_path}\n")
            summary.write("-" * 40 + "\n")
            try:
                with open(file_path, 'r') as file_content:
                    summary.write(file_content.read())
            except Exception as e:
                summary.write(f"Error reading file: {e}\n")
            summary.write("\n" + "=" * 40 + "\n\n")

def main():
    files_to_include = get_files_to_include()
    write_summary_file(files_to_include)

if __name__ == "__main__":
    main()
