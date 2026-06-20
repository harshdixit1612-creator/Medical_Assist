-- Allow anyone to insert a new triage case (since the form is public)
CREATE POLICY "Allow public insert to triage_cases"
ON triage_cases FOR INSERT
WITH CHECK (true);
