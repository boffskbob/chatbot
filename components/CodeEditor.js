import { useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import MonacoEditor from '@monaco-editor/react';

const CodeEditor = ({ onChange }) => {
  const [language, setLanguage] = useState('python'); // sets default language as python
  // default class and function
  const [code, setCode] = useState(`class Solution(object):\n\tdef twoSum(self, nums, target):\n\t\t"""\n\t\t:type nums: List[int]\n\t\t:type target: int\n\t\t:rtype: List[int]\n\t\t"""`);

  // helper functions for language dropdown and editor changes
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleEditorChange = (value) => {
    setCode(value);
    onChange(value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
        {/* language dropdown */}
        <FormControl sx={{ mb: 2, minWidth: 200 }}>
          <InputLabel>Language</InputLabel>
          <Select
            value={language}
            onChange={handleLanguageChange}
            label="Language"
          >
            {/* top 10 most popular languages */}
            <MenuItem value="python">Python</MenuItem>
            <MenuItem value="javascript">JavaScript</MenuItem>
            <MenuItem value="java">Java</MenuItem>
            <MenuItem value="csharp">C#</MenuItem>
            <MenuItem value="cpp">C++</MenuItem>
            <MenuItem value="php">PHP</MenuItem>
            <MenuItem value="typescript">Typescript</MenuItem>
            <MenuItem value="swift">Swift</MenuItem>
            <MenuItem value="ruby">Ruby</MenuItem>
            <MenuItem value="go">Go</MenuItem>
          </Select>
        </FormControl>
        {/* run button (color=success apparently means green!) */}
        <Button
          variant="contained"
          color="success"
          sx={{ borderRadius: '30px', textTransform: 'none', padding: '10px 30px', fontSize: 15 }}
        >
          Run →
        </Button>
      </Box>
      <Box sx={{ flex: 1, border: '1px solid #ddd', borderRadius: 1 }}>
        {/* editor component allowing for coding window */}
        <MonacoEditor
          height="400px"
          language={language}
          value={code}
          // constantly updates component using helper function
          onChange={(value) => handleEditorChange(value)} 
          theme="vs-dark" 
          options={{
            readOnly: false,
            fontFamily: 'Monaco, Menlo, Ubuntu Mono, Consolas, source-code-pro',
            fontSize: 14
          }}
        />
      </Box>
    </Box>
  );
};

export default CodeEditor;
