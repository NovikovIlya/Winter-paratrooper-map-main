import "./style.css"

import { useBlockProps } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"
import metadata from "./block.json"
import { useSelect } from '@wordpress/data';

registerBlockType(metadata.name, { edit: EditComponent })

function EditComponent(props) {
  

  return (
    <div {...useBlockProps()}>
      <div className="my-unique-plugin-wrapper-class">
        <div className="bg-blue-200 border-2 border-blue-300 rounded-md p-5">
          <div
            className="mr-3 p-2 rounded-lg"
           
          />
        </div>
      </div>
    </div>
  )
}
