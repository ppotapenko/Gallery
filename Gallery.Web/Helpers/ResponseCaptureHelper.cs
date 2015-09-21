﻿using System;
using System.IO;
using System.Web;

namespace Arsis.RekodRIAS.Web.Helpers
{
    public class ResponseCaptureHelper : IDisposable
    {
        private readonly HttpResponseBase _response;
        private readonly TextWriter _originalWriter;
        private StringWriter _localWriter;
        public ResponseCaptureHelper(HttpResponseBase response)
        {
            _response = response;
            _originalWriter = response.Output;
            _localWriter = new StringWriter();
            response.Output = _localWriter;
        }
        public override string ToString()
        {
            _localWriter.Flush();
            return _localWriter.ToString();
        }
        public void Dispose()
        {
            if (_localWriter != null)
            {
                _localWriter.Dispose();
                _localWriter = null;
                _response.Output = _originalWriter;
            }
        }
    }
}