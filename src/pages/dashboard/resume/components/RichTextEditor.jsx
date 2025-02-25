import { Button } from '@/components/ui/button';
import { Brain, LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg';

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  const GenerateSummeryFromAI = async () => {
    toast.error("Ai Server Is Down")
    return
  }
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue])

  return (
    <div>
      <div className='flex justify-between my-4'>
        <label className='text-lg'>Summary</label>
      
        <Button variant="outline" size="sm"
          onClick={GenerateSummeryFromAI}
          disabled={loading}
          className="flex gap-2 border-primary text-primary">
          {loading ?
            <LoaderCircle className='animate-spin' /> :
            <>
              <Brain className='h-4 w-4' /> Generate from AI
            </>
          }
        </Button>
      </div>
      <EditorProvider>
        <Editor value={value} onChange={(e) => {
          setValue(e.target.value);
          onRichTextEditorChange(e)
        }}>
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  )
}

export default RichTextEditor