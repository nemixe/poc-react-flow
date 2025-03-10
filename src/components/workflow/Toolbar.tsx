import React from "react";
import { Button } from "../ui/button";
import {
  Save,
  Plus,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Maximize,
} from "lucide-react";

interface ToolbarProps {
  onAddNode: (type: string) => void;
  onSave: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitView: () => void;
}

export function Toolbar({
  onAddNode,
  onSave,
  onUndo,
  onRedo,
  onZoomIn,
  onZoomOut,
  onFitView,
}: ToolbarProps) {
  return (
    <div className="border-b border-gray-200 bg-white p-4">
      <div className="flex items-center space-x-4">
        <div className="space-x-2">
          <Button
            onClick={() => onAddNode("start")}
            variant="outline"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Start
          </Button>
          <Button
            onClick={() => onAddNode("approval")}
            variant="outline"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Approval
          </Button>
          <Button
            onClick={() => onAddNode("decision")}
            variant="outline"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Decision
          </Button>
          <Button onClick={() => onAddNode("end")} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            End
          </Button>
          <Button onClick={() => onAddNode("user")} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            User
          </Button>
          <Button
            onClick={() => onAddNode("notification")}
            variant="outline"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Notification
          </Button>
        </div>

        <div className="h-6 w-px bg-gray-200" />

        <div className="space-x-2">
          <Button onClick={onUndo} variant="ghost" size="icon">
            <Undo className="w-4 h-4" />
          </Button>
          <Button onClick={onRedo} variant="ghost" size="icon">
            <Redo className="w-4 h-4" />
          </Button>
        </div>

        <div className="h-6 w-px bg-gray-200" />

        <div className="space-x-2">
          <Button onClick={onZoomIn} variant="ghost" size="icon">
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button onClick={onZoomOut} variant="ghost" size="icon">
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button onClick={onFitView} variant="ghost" size="icon">
            <Maximize className="w-4 h-4" />
          </Button>
        </div>

        <div className="h-6 w-px bg-gray-200" />

        <Button onClick={onSave} variant="default" size="sm">
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
      </div>
    </div>
  );
}

export default Toolbar;
