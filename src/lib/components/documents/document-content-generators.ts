import type { CustomerDocument } from '$lib/stores/documentStore';
import type { DocumentContent } from './document-viewer.types';
import { FileText, Image, File } from 'lucide-svelte';

export const generateMockPDFContent = (doc: CustomerDocument): string => {
  switch (doc.type) {
    case 'IFTA':
      return `
        <div class="pdf-page">
          <div class="pdf-header">
            <h1>INTERNATIONAL FUEL TAX AGREEMENT</h1>
            <h2>QUARTERLY FUEL TAX REPORT</h2>
            <div class="report-period">Q4 2024</div>
          </div>
          
          <div class="pdf-section">
            <h3>Carrier Information</h3>
            <div class="info-grid">
              <div><strong>Carrier Name:</strong> Apex Oil Transport LLC</div>
              <div><strong>IFTA Account:</strong> TX-123456789</div>
              <div><strong>Report Period:</strong> October 1 - December 31, 2024</div>
              <div><strong>Due Date:</strong> January 31, 2025</div>
            </div>
          </div>
          
          <div class="pdf-section">
            <h3>Fuel Summary</h3>
            <table class="fuel-table">
              <thead>
                <tr>
                  <th>Jurisdiction</th>
                  <th>Miles Traveled</th>
                  <th>Gallons Purchased</th>
                  <th>Gallons Used</th>
                  <th>Tax Rate</th>
                  <th>Tax Due</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Texas</td>
                  <td>12,450</td>
                  <td>2,100</td>
                  <td>1,867</td>
                  <td>$0.20</td>
                  <td>$373.40</td>
                </tr>
                <tr>
                  <td>Oklahoma</td>
                  <td>8,230</td>
                  <td>1,200</td>
                  <td>1,234</td>
                  <td>$0.19</td>
                  <td>$234.46</td>
                </tr>
                <tr>
                  <td>Louisiana</td>
                  <td>6,890</td>
                  <td>950</td>
                  <td>1,033</td>
                  <td>$0.20</td>
                  <td>$206.60</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="pdf-footer">
            <div class="signature-section">
              <div class="signature-line">
                <div>Authorized Signature: _________________________</div>
                <div>Date: ${new Date().toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        </div>
      `;
      
    case 'Insurance':
      return `
        <div class="pdf-page">
          <div class="pdf-header">
            <h1>COMMERCIAL AUTO INSURANCE POLICY</h1>
            <div class="policy-number">Policy #: CAI-2024-789456</div>
          </div>
          
          <div class="pdf-section">
            <h3>Policy Holder Information</h3>
            <div class="info-grid">
              <div><strong>Insured:</strong> Apex Oil Transport LLC</div>
              <div><strong>Address:</strong> 1234 Industrial Blvd, Houston, TX 77001</div>
              <div><strong>Policy Period:</strong> January 1, 2024 - December 31, 2024</div>
              <div><strong>Premium:</strong> $45,000 annually</div>
            </div>
          </div>
          
          <div class="pdf-section">
            <h3>Coverage Details</h3>
            <table class="coverage-table">
              <thead>
                <tr>
                  <th>Coverage Type</th>
                  <th>Limit</th>
                  <th>Deductible</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Bodily Injury Liability</td>
                  <td>$1,000,000 per person / $2,000,000 per accident</td>
                  <td>$0</td>
                </tr>
                <tr>
                  <td>Property Damage Liability</td>
                  <td>$1,000,000 per accident</td>
                  <td>$0</td>
                </tr>
                <tr>
                  <td>Comprehensive</td>
                  <td>Actual Cash Value</td>
                  <td>$2,500</td>
                </tr>
                <tr>
                  <td>Collision</td>
                  <td>Actual Cash Value</td>
                  <td>$5,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="pdf-section">
            <h3>Covered Vehicles</h3>
            <div class="vehicle-list">
              <div class="vehicle-item">
                <strong>Unit #001:</strong> 2022 Peterbilt 579 - VIN: 1XPWD40X1ED123456
              </div>
              <div class="vehicle-item">
                <strong>Unit #002:</strong> 2023 Kenworth T680 - VIN: 1XKWD40X2FD789012
              </div>
              <div class="vehicle-item">
                <strong>Unit #003:</strong> 2021 Freightliner Cascadia - VIN: 3AKJHHDR3MSAB1234
              </div>
            </div>
          </div>
        </div>
      `;
      
    case 'PreTrip':
      return `
        <div class="pdf-page">
          <div class="pdf-header">
            <h1>PRE-TRIP INSPECTION REPORT</h1>
            <div class="inspection-date">Date: ${new Date().toLocaleDateString()}</div>
          </div>
          
          <div class="pdf-section">
            <h3>Vehicle Information</h3>
            <div class="info-grid">
              <div><strong>Vehicle ID:</strong> Unit #002</div>
              <div><strong>Driver:</strong> John Smith</div>
              <div><strong>Odometer:</strong> 245,678 miles</div>
              <div><strong>Inspection Time:</strong> 06:30 AM</div>
            </div>
          </div>
          
          <div class="pdf-section">
            <h3>Inspection Checklist</h3>
            <div class="checklist">
              <div class="checklist-category">
                <h4>Engine Compartment</h4>
                <div class="checklist-item">✓ Oil Level - OK</div>
                <div class="checklist-item">✓ Coolant Level - OK</div>
                <div class="checklist-item">✓ Belt Condition - OK</div>
                <div class="checklist-item">✓ Hoses - OK</div>
              </div>
              
              <div class="checklist-category">
                <h4>Tires & Wheels</h4>
                <div class="checklist-item">✓ Tire Pressure - All OK</div>
                <div class="checklist-item">✓ Tread Depth - Adequate</div>
                <div class="checklist-item">✓ Wheel Nuts - Secure</div>
                <div class="checklist-item">✓ No Visible Damage</div>
              </div>
              
              <div class="checklist-category">
                <h4>Lights & Electrical</h4>
                <div class="checklist-item">✓ Headlights - Working</div>
                <div class="checklist-item">✓ Tail Lights - Working</div>
                <div class="checklist-item">✓ Turn Signals - Working</div>
                <div class="checklist-item">✓ Brake Lights - Working</div>
              </div>
              
              <div class="checklist-category">
                <h4>Brakes</h4>
                <div class="checklist-item">✓ Air Pressure - 120 PSI</div>
                <div class="checklist-item">✓ Brake Lines - No Leaks</div>
                <div class="checklist-item">✓ Brake Pads - Good</div>
              </div>
            </div>
          </div>
          
          <div class="pdf-footer">
            <div class="signature-section">
              <div>Driver Signature: John Smith</div>
              <div>Date: ${new Date().toLocaleDateString()}</div>
              <div>Status: PASSED - Vehicle Safe for Operation</div>
            </div>
          </div>
        </div>
      `;
      
    default:
      return `
        <div class="pdf-page">
          <div class="pdf-header">
            <h1>${doc.type.toUpperCase()} DOCUMENT</h1>
            <div class="document-info">${doc.fileName}</div>
          </div>
          
          <div class="pdf-section">
            <h3>Document Details</h3>
            <div class="info-grid">
              <div><strong>Document Type:</strong> ${doc.type}</div>
              <div><strong>Upload Date:</strong> ${doc.uploadDate.toLocaleDateString()}</div>
              <div><strong>Uploaded By:</strong> ${doc.uploadedBy}</div>
              <div><strong>Status:</strong> ${doc.status}</div>
            </div>
          </div>
          
          <div class="pdf-section">
            <p>This is a mock ${doc.type} document for demonstration purposes. In a real application, this would display the actual document content.</p>
          </div>
        </div>
      `;
  }
};

export const generateMockImageContent = (doc: CustomerDocument): string => {
  return `
    <div class="image-container">
      <div class="image-placeholder">
        <div class="image-icon">📷</div>
        <div class="image-info">
          <h3>${doc.fileName}</h3>
          <p>Image Document</p>
          <div class="image-details">
            <div>Type: ${doc.type}</div>
            <div>Size: ${(doc.fileSize / 1024 / 1024).toFixed(2)} MB</div>
            <div>Uploaded: ${doc.uploadDate.toLocaleDateString()}</div>
          </div>
        </div>
      </div>
    </div>
  `;
};

export const generateMockTextContent = (doc: CustomerDocument): string => {
  return `
    <div class="text-document">
      <h2>${doc.fileName}</h2>
      <div class="text-content">
        <p><strong>Document Type:</strong> ${doc.type}</p>
        <p><strong>Created:</strong> ${doc.uploadDate.toLocaleDateString()}</p>
        <p><strong>Author:</strong> ${doc.uploadedBy}</p>
        
        <hr>
        
        <h3>Sample Content</h3>
        <p>This is a sample text document for the Logistics Temperature Tracking system. This document contains important information related to ${doc.type} operations.</p>
        
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        
        <h4>Key Points:</h4>
        <ul>
          <li>Temperature monitoring protocols</li>
          <li>Safety compliance requirements</li>
          <li>Equipment maintenance schedules</li>
          <li>Regulatory documentation</li>
        </ul>
      </div>
    </div>
  `;
};

export const generateMockDocumentContent = (doc: CustomerDocument): string => {
  return generateMockPDFContent(doc);
};

export const getMockDocumentContent = (doc: CustomerDocument): DocumentContent => {
  const fileExtension = doc.fileName.toLowerCase().split('.').pop();
  
  switch (fileExtension) {
    case 'pdf':
      return {
        type: 'pdf',
        content: generateMockPDFContent(doc),
        icon: FileText
      };
    case 'jpg':
    case 'jpeg':
    case 'png':
      return {
        type: 'image',
        content: generateMockImageContent(doc),
        icon: Image
      };
    case 'txt':
      return {
        type: 'text',
        content: generateMockTextContent(doc),
        icon: File
      };
    case 'doc':
    case 'docx':
      return {
        type: 'document',
        content: generateMockDocumentContent(doc),
        icon: FileText
      };
    default:
      return {
        type: 'unknown',
        content: 'Document preview not available',
        icon: File
      };
  }
}; 