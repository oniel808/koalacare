import React, { useState, useEffect } from 'react'

import { Link } from "@material-ui/core";
export function TermsOfAgreement(props){
  const { a } = props
  return(
    <React.Fragment>
      {a=="text"?
      "aishdasihda"
      :
      <Link href={"/Terms-of-Agreement"} style={{ textDecoration: 'none' }}>
        Terms of Agreements
      </Link>
      }
    </React.Fragment>
  )
}
export function PrivacyPolicy(props){
  const { a } = props
  return(
    <React.Fragment>
      {a=="text"?
      "aishdasihda"
      :
      <Link href={"/Privacy-Policy"} style={{ textDecoration: 'none' }}>
        Privacy Policy
      </Link>
      }
    </React.Fragment>
  )
}