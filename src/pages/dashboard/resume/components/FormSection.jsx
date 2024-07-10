import React, { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import PersonalDetail from "./forms/PersonalDetail";
import Summery from "./forms/Summary";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import ThemeColor from "./ThemeColor";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const { resumeId } = useParams();

  const renderForm = () => {
    switch (activeFormIndex) {
      case 1:
        return <PersonalDetail enabledNext={(v) => setEnableNext(v)} />;
      case 2:
        return <Summery enabledNext={(v) => setEnableNext(v)} />;
      case 3:
        return <Experience />;
      case 4:
        return <Education />;
      case 5:
        return <Skills />;
      case 6:
        return <Navigate to={`/my-resume/${resumeId}/view`} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-5">
          <Link to="/dashboard">
            <Button>
              <Home />
            </Button>
          </Link>
          <ThemeColor />
        </div>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft />
            </Button>
          )}
          <Button
            disabled={!enableNext}
            className="flex gap-2"
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next
            <ArrowRight />
          </Button>
        </div>
      </div>
      {renderForm()}
    </div>
  );
}

export default FormSection;
